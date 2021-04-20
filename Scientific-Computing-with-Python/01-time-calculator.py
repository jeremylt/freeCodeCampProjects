def add_time(start, duration, day = ""):
  # convert start
  [time_string, am_or_pm] = start.split(" ")
  [hours, minutes] = [int(x) for x in time_string.split(":")]
  if am_or_pm == "PM":
    hours += 12

  # convert duration
  [add_hours, add_minutes] = [int(x) for x in duration.split(":")]

  # add and reduce
  [new_hours, new_minutes] = [hours + add_hours, minutes + add_minutes]
  while new_minutes > 60:
    new_hours += 1
    new_minutes -= 60
  add_days = 0
  while new_hours > 24:
    add_days += 1
    new_hours -= 24
  am_or_pm = "AM"
  if new_hours == 24:
    new_hours -= 12
    add_days += 1
  elif new_hours > 12:
    new_hours -= 12
    am_or_pm = "PM"
  elif new_hours == 12:
    am_or_pm = "PM"
  
  # build return string
  result = str(new_hours) + ":" + str(new_minutes).rjust(2, "0") + " " + am_or_pm
  if day != "":
    days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    day_index = days.index(day.lower())
    day_index += add_days
    day_index = day_index % 7
    result += ", " + days[day_index].title()
  if add_days == 1:
    result += " (next day)"
  elif add_days > 1:
    result += " (" + str(add_days) + " days later)"

  return result
