@UkvietRegression
Feature: UKVIET - UkVI Ending of Tenancy

  Background:
    Given Test data has been created for "UKVIET" scenarios

  @ukviet-validation @journey-request
  Scenario: UKVIET - Field page validation error message
    Given I selected the data for scenario "1" - "Request a notice - Multiple tenants - Landlord"
    And I visit the Ukviet ending of tenancy page
    When I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Select an option" error message displayed for ukvi
    When I select a Ukviet journey to start my application and click continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see error message displayed for ukvi
          """
          Enter details of the property building and street
          Enter a town or city
          Enter the property's postcode
         """
    When I enter address details and click continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Enter a date" error message displayed for ukvi
    When I enter tenancy start date "10/16/2023" and click continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Enter a valid date" error message displayed for ukvi
    When I enter tenancy start date "02/10/1800" and click continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Date cannot be before the 20th Century" error message displayed for ukvi
    When I enter tenancy start date "11/06/2023" and click continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Enter the person’s name" error message displayed for ukvi
    When I enter the person's name and click continue
    And I select continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Select an option" error message displayed for ukvi
    When I select "No" to other tenants disqualified from renting the property and click continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see "Select an option" error message displayed for ukvi
    When I select who you are "Landlord" and click continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see error message displayed for ukvi
          """
          Enter your full name
          Enter your email address
          Enter your phone number
         """
    When I enter landlord address details and click continue
    And I select continue
    Then I see "There’s a problem" error header message displayed for ukvi
    And I see error message displayed for ukvi
          """
          Enter details of the building and street
          Enter a town or city
          Enter a postcode
         """
    When I answer What's your address and click continue
    Then I am on the Check your answers page
