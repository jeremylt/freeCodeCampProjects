class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __repr__(self):
        return (
            "Rectangle(width=" + str(self.width) + ", height=" + str(self.height) + ")"
        )

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5

    def get_picture(self):
        if self.height > 50 or self.width > 50:
            return "Too big for picture."
        output_string = ""
        for i in range(0, self.height):
            output_string += ("*" * self.width) + "\n"
        return output_string

    def get_amount_inside(self, shape):
        return (self.height // shape.height) * (self.width // shape.width)


class Square(Rectangle):
    def __init__(self, width):
        super().__init__(width, width)

    def __repr__(self):
        return "Square(side=" + str(self.width) + ")"

    def set_side(self, side):
        self.height = side
        self.width = side

    def set_width(self, width):
        self.set_side(width)

    def set_height(self, height):
        self.set_side(height)

