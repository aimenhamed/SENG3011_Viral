# Test Scripts

## How to run scripts

Please ensure the bash scripts have execute permissions, an example to do this is:

`chmod 755 (bashscript)`

You need to run the scripts within the TestScripts directory.

`cd PHASE_1/TestScripts`

## coverage.sh

This script runs a coverage check on all the files and produces a coverag summary output. This output includes the coverage on all statements, branches, functions and lines.

For a complete breakdown on the coverage per file, please run the test & coverage script in the application directory.

To run the script, once you have given it executable permissions (see above):

`./coverage.sh`

## runtests.sh

This script runs all the unit tests within the application and simply shows a green or red indicator of whether the application is passing or not. This is particularly useful as a general purpose indicator and sanity check that devs can use to see if their changes are working.

For a complete breakdown and output of the tests, please run the test script in the application directory.

To run the script, once you have given it executable permissions (see above):

`./runtests.sh`

## Pipeline

These tests are run as soon as a pull request or push to master is made, and require a 100% pass inorder to be merged in or deployed. This allows safety so that the code is never breaking, whilst also allowing CI increasing dev efficiency.
