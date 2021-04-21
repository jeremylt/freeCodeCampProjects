class Category:
    def __init__(self, name):
        self._name = name
        self._balance = 0
        self.ledger = []

    def __str__(self):
        output_string = self._name.center(30, "*")
        for item in self.ledger:
            output_string += "\n" + item["description"].ljust(23, " ")[0:23]
            output_string += "{0:.2f}".format(item["amount"]).rjust(7, " ")
        output_string += "\nTotal: " + "{:.2f}".format(self._balance)
        return output_string

    def get_balance(self):
        return self._balance

    def check_funds(self, amount):
        return amount <= self.get_balance()

    def deposit(self, amount, description=""):
        self._balance += amount
        self.ledger.append({"amount": 1.0 * amount, "description": description})

    def withdraw(self, amount, description=""):
        # only withdraw if adequate funds are present
        if self.check_funds(amount):
            self._balance -= amount
            self.ledger.append({"amount": -1.0 * amount, "description": description})
            return True
        return False

    def transfer(self, amount, category):
        description = "Transfer to " + category._name
        withdrawn = self.withdraw(amount, description)
        if withdrawn:
            description = "Transfer from " + self._name
            category.deposit(amount, description)
        return withdrawn


def create_spend_chart(categories):
    category_info = []
    total_spent = 0

    # find amount spent in each category
    for category in categories:
        spent = 0
        for item in category.ledger:
            if item["amount"] < 0:
                spent -= item["amount"]
        total_spent += spent
        category_info.append({"name": category._name, "spent": spent})

    # calculate percentages
    category_info = [
        {"name": x["name"], "percent": x["spent"] * 100.0 / total_spent}
        for x in category_info
    ]

    # build output
    output_string = "Percentage spent by category\n"
    for percent in range(100, -1, -10):
        output_string += str(percent).rjust(3, " ") + "| "
        for category in category_info:
            output_string += "o  " if category["percent"] >= percent else "   "
        output_string += "\n"
    output_string += "    -" + ("---" * len(category_info))
    longest_name_len = max([len(x["name"]) for x in category_info])
    for i in range(0, longest_name_len):
        output_string += "\n     "
        for category in category_info:
            if i < len(category["name"]):
                output_string += category["name"][i] + "  "
            else:
                output_string += "   "
    return output_string

