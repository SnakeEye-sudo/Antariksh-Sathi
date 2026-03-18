from __future__ import annotations

import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "live-pack.json"
UA = {"User-Agent": "Mozilla/5.0 AntarikshSathiBot/1.0"}


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", "ignore")


def pull_nasa() -> list[dict[str, str]]:
    xml_text = fetch("https://www.nasa.gov/rss/dyn/breaking_news.rss")
    root = ET.fromstring(xml_text)
    items = []
    for item in root.findall("./channel/item")[:2]:
      title = (item.findtext("title") or "").strip()
      description = re.sub(r"<[^>]+>", " ", item.findtext("description") or "")
      description = re.sub(r"\s+", " ", description).strip()
      if title:
          items.append({
              "source": "NASA",
              "title": title,
              "summary": description[:220]
          })
    return items


def pull_isro() -> list[dict[str, str]]:
    html = fetch("https://www.isro.gov.in/")
    block = re.search(
        r"flash news begins.*?<div class=\"col-12 mt-2 mb-0\">(.*?)</div>\s*</div>\s*</div>",
        html,
        re.IGNORECASE | re.DOTALL,
    )
    if not block:
        return []
    text = re.sub(r"<[^>]+>", " ", block.group(1))
    lines = [re.sub(r"\s+", " ", line).strip() for line in text.split("Flash News:")]
    headlines = [line for line in lines if line][:3]
    return [
        {
            "source": "ISRO",
            "title": headline,
            "summary": "Pulled from the official ISRO homepage flash updates."
        }
        for headline in headlines
    ]


def main() -> None:
    headlines = []
    try:
        headlines.extend(pull_isro())
    except Exception as exc:  # pragma: no cover - best effort fetch
        headlines.append({
            "source": "ISRO",
            "title": "Official ISRO homepage could not be refreshed right now.",
            "summary": str(exc),
        })

    try:
        headlines.extend(pull_nasa())
    except Exception as exc:  # pragma: no cover - best effort fetch
        headlines.append({
            "source": "NASA",
            "title": "Official NASA RSS could not be refreshed right now.",
            "summary": str(exc),
        })

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "headlines": headlines[:5],
    }
    OUTPUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
