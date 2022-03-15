#!/bin/bash

NC="\033[0m" # No colour
RED="\033[0;31m"
GREEN="\033[0;32m"
WHITE="\033[1;37m"

echo -e "${WHITE}Running test cases...${NC}"
echo ""

cd ../API_SourceCode
tests=$(npm run test 2> /dev/null)

success=$?

echo -e "${WHITE}Completed running test cases. For complete output, please run tests in application.${NC}"
echo ""

if [ $success -eq 0 ]
then
  echo -e "${WHITE}Tests ${GREEN}passed${WHITE}.${NC}"
else
  echo -e "${WHITE}Tests ${RED}failed${WHITE}.${NC}"
fi