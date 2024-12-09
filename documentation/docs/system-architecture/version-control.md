---
sidebar_position: 6
---

# Version Control

## Overview

We're managing Devs and Dragons using **git** and **GitHub**. 

Our git repository serves as a **monorepo** combining three distinct parts of our project
- Docusaurus Documentation
- Flask Web Server
- Core user interface

## Branching 

- Branches are created based on the latest **main** branch commit.

## Branch Protection

- We require a pull request before merging into main.


## GitHub Actions


- We use GitHub Actions to automate testing and deployment of our project.

### Docusaurus Build

We use a **GitHub Action** on our **main** branch to build our Docusaurus project documentation. Docusaurus uses the text and configuration details from Markdown and JSON files to build an HTML-based documentation website.
