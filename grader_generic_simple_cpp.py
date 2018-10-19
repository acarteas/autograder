﻿import os
import subprocess
import csv
import shutil
from autograder.cpp_autograder import CppAutograder
from tester_generic_simple_cpp import GenericTester

tester = GenericTester()

SUBMISSION_DIRECTORY = 'to_test'
WORKSPACE_DIRECTORY = 'temp'
RESULTS_DIRECTORY = 'results'
FILE_EXTENSION = list({'.cpp'})
TESTING_FILE = ''
TESTING_COMMAND = tester
TESTING_OPTIONS = ''
WORKING_FILE_NAME = ''


if __name__ == '__main__':

   grader = CppAutograder(FILE_EXTENSION, 
                       TESTING_FILE, 
                       TESTING_COMMAND,
                       TESTING_OPTIONS, 
                       WORKING_FILE_NAME
                       )
   grader.run()
      