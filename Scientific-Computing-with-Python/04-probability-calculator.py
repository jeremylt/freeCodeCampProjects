import random
# Consider using the modules imported above.

class Hat:
  def __init__(self, **kwargs):
    contents = []
    for ball in kwargs:
      for _ in range(int(kwargs[ball])):
        contents.append(ball)
    self.contents = contents
    self._original_contents = contents.copy()

  def copy(self):
    new_hat = Hat(noncolor=1)
    new_hat.contents = self.contents.copy()
    new_hat._original_contents = self._original_contents.copy()
    return new_hat

  def draw(self, num_balls_drawn):
    # check if too many have been drawn
    if num_balls_drawn > len(self.contents):
      self.contents = self._original_contents.copy()
      return self.contents.copy()
    
    # draw randomly if enough avaliable
    balls_drawn = []
    for _ in range(num_balls_drawn):
      balls_drawn.append(self.contents.pop(random.randrange(len(self.contents))))
    return balls_drawn

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  num_success = 0
  for _ in range(num_experiments):
    current_draw = hat.copy().draw(num_balls_drawn)
    success = all(current_draw.count(ball) >= expected_balls[ball] for ball in expected_balls.keys())
    if success:
      num_success += 1
  return num_success / num_experiments

