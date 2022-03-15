#!/bin/bash

NC="\033[0m" # No colour
WHITE="\033[1;37m"
YELLOW="\033[0;34m"

echo -e "${WHITE}Checking coverage on all files...${NC}"
echo ""

cd ../API_SourceCode
tests=$(npm run coverage 2> /dev/null)

echo -e "${WHITE}Completed running coverage checks. For complete output, please run coverage and tests in application.${NC}"
echo ""

output=$(echo "$tests" | tail -6 2> /dev/null)

echo -e "${YELLOW}$output${NC}"
