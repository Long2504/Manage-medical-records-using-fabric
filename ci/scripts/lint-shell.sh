#!/bin/bash
set -euo pipefail

shellcheck --version

cd ./hospital-network-nano-bash && shellcheck *.sh
