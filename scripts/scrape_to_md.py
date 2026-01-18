#!/usr/bin/env python3
"""Fetch HTML from a URL and convert it to Markdown."""

from __future__ import annotations

import argparse
import pathlib
import sys

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md


def fetch_html(url: str, timeout: int) -> str:
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.text


def html_to_markdown(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    return md(str(soup), heading_style="ATX")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scrape HTML and convert to Markdown.")
    parser.add_argument("url", help="URL to scrape")
    parser.add_argument(
        "-o",
        "--output",
        help="Output markdown file (default: stdout)",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=15,
        help="Request timeout in seconds",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        html = fetch_html(args.url, args.timeout)
        markdown = html_to_markdown(html)
    except requests.RequestException as exc:
        print(f"Request failed: {exc}", file=sys.stderr)
        return 1

    if args.output:
        output_path = pathlib.Path(args.output)
        output_path.write_text(markdown, encoding="utf-8")
        return 0

    print(markdown)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
