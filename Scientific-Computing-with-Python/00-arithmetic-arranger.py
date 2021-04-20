def arithmetic_arranger(problems, display = False):
  # check number of problems
  if len(problems) > 5:
    return "Error: Too many problems."

  # setup
  first_row = ""
  second_row = ""
  dash_row = ""
  solution_row = ""

  # loop over problems
  for problem in problems:
    # split problem
    [left, operator, right] = problem.split(' ')
    
    # check operator
    if operator not in ['+', '-']:
      return "Error: Operator must be '+' or '-'."
    
    # check valid numbers
    left_int = 0
    right_int = 0
    try:
      left_int = int(left)
      right_int = int(right)
    except:
      return "Error: Numbers must only contain digits."
    
    # check number length
    num_digits = max(len(left), len(right))
    if num_digits > 4:
      return "Error: Numbers cannot be more than four digits."
    
    # build strings for arranged problem rows
    if first_row != "":
      spacing = "    "
      first_row += spacing
      second_row += spacing
      dash_row += spacing
      solution_row += spacing
    first_row += left.rjust(num_digits + 2, ' ')
    second_row += operator + " " + right.rjust(num_digits, ' ')
    dash_row += "-" * (num_digits + 2)
    if display:
      result = left_int + right_int if operator == '+' else left_int - right_int
      solution_row += str(result).rjust(num_digits + 2, ' ')
    
  # build and return final string
  arranged_problems = first_row + "\n" + second_row + "\n" + dash_row
  if display:
    arranged_problems += "\n" + solution_row
  return arranged_problems
