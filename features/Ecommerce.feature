Feature: SauceDemo E2E Product Order Flow


  Scenario: Add a product to the cart and verify cart count
    Given the user navigates to the home page with "standard_user"
    And the user adds "Sauce Labs Backpack" to the cart
    Then the cart count should be "1"

  Scenario: Proceed to checkout and verify page title
    When the user clicks on the cart badge
    And the user proceeds to checkout
    Then the checkout title should be "Checkout: Your Information"

  Scenario: Fill shipping information and verify price
    When the user enters the shipping details
      | firstName   | John     |
      | lastName    | Doe      |
      | postalCode  | 12345    |
    Then the product price should match the selected item

  Scenario: Complete the order and verify confirmation
    When the user clicks on the finish button
    Then the user should see the confirmation message "Thank you for your order!"

  Scenario: Logout from application
    When the user logs out
    Then the user should be navigated to the login page
