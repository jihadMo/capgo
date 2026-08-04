#!/usr/bin/env python3
"""
Structured Git CHANGELOG Generator ($50 Opire Bounty)
Automatically categorizes git commit history into Added, Fixed, Changed, and Removed.
"""
import subprocess
import sys
import re
import datetime
import os

def run_cmd(cmd):
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return res.stdout.strip()
    except Exception:
        return ""

def get_latest_tag():
    return run_cmd(["git", "describe", "--tags", "--abbrev=0"])

def get_commits(since_tag=None):
    if since_tag:
        git_range = f"{since_tag}..HEAD"
    else:
        git_range = "HEAD"
    
    raw = run_cmd(["git", "log", git_range, "--pretty=format:%h|%s|%an|%ad", "--date=short"])
    if not raw:
        # Fallback for empty range
        raw = run_cmd(["git", "log", "-n", "20", "--pretty=format:%h|%s|%an|%ad", "--date=short"])
    
    commits = []
    for line in raw.split("\n"):
        if not line.strip():
            continue
        parts = line.split("|")
        if len(parts) >= 4:
            commits.append({
                "hash": parts[0],
                "subject": parts[1],
                "author": parts[2],
                "date": parts[3]
            })
    return commits

def categorize_commits(commits):
    categories = {
        "Added": [],
        "Fixed": [],
        "Changed": [],
        "Removed": []
    }
    
    for c in commits:
        subj = c["subject"]
        entry = f"- {subj} ([`{c['hash']}`])"
        
        lower = subj.lower()
        if lower.startswith("fix") or "bug" in lower or "patch" in lower or "error" in lower:
            categories["Fixed"].append(entry)
        elif lower.startswith("feat") or "add" in lower or "create" in lower or "new" in lower:
            categories["Added"].append(entry)
        elif lower.startswith("remove") or "delete" in lower or "drop" in lower or "deprecate" in lower:
            categories["Removed"].append(entry)
        else:
            categories["Changed"].append(entry)
            
    return categories

def generate_changelog_md(categories, version="Unreleased"):
    date_str = datetime.date.today().isoformat()
    md = [f"# Changelog\n\nAll notable changes to this project will be documented in this file.\n"]
    md.append(f"## [{version}] - {date_str}\n")
    
    for section in ["Added", "Fixed", "Changed", "Removed"]:
        items = categories[section]
        if items:
            md.append(f"### {section}\n")
            for item in items:
                md.append(f"{item}\n")
            md.append("\n")
            
    return "".join(md)

def main():
    latest_tag = get_latest_tag()
    commits = get_commits(latest_tag)
    categories = categorize_commits(commits)
    
    version = latest_tag if latest_tag else "Unreleased"
    content = generate_changelog_md(categories, version)
    
    output_file = "CHANGELOG.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"✅ Generated {output_file} successfully ({len(commits)} commits processed).")

if __name__ == "__main__":
    main()
