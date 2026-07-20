@UkvietRegression
Feature: UKVIET - UkVI Ending of Tenancy

  Background:
    Given Test data has been created for "UKVIET" scenarios

  @UkvietRegressionCI @ukviet-e2e
  Scenario Outline: UKVIET Ending of Tenancy 1 - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the Ukviet ending of tenancy page
    And I fill out my answers for the Ukviet questionnaire
    Then I check my answers for Ukviet - "<Description>"
    And I am able to submit the Ukviet questionnaire
    @journey-request
    Examples:
      | Scenario ID | Description                                                           |
      | 1           | Request a notice - Multiple tenants - Landlord                        |
      | 2           | Request a notice - Single tenant - Agent                              |
      | 3           | Request a notice - Single tenant - Landlord                           |

    @journey-check
    Examples:
      | Scenario ID | Description                                                           |
      | 4           | Disqualified person left property - Multiple tenants - Checking Agent |
      | 5           | Report disqualified person left property  - Multiple tenants - Agent  |

  @ukviet-e2e
  Scenario Outline: UKVIET Ending of Tenancy 2 - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the Ukviet ending of tenancy page
    And I fill out my answers for the Ukviet questionnaire
    Then I check my answers for Ukviet - "<Description>"
    And I am able to submit the Ukviet questionnaire
    @journey-check
    Examples:
      | Scenario ID | Description                                                              |
      | 6           | Request a notice - Multiple tenants - Agent                              |
      | 7           | Disqualified person left property - Multiple tenants - Checking Landlord |
      | 8           | Disqualified person left property - Single tenant - Checking Agent       |

    @journey-report
    Examples:
      | Scenario ID | Description                                                              |
      | 9           | Disqualified person left property - Single tenant - Checking Landlord    |
      | 10          | Report disqualified person left property - Single tenant - Landlord      |
      | 11          | Report disqualified person left property - Multiple tenants - Landlord   |
      | 12          | Report disqualified person left property - Single tenant - Agent         |

  @journey-request @change-answer
  Scenario: UKVIET Ending of Tenancy - Change your answers in Check answers page
    Given I selected the data for scenario "1" - "Request a notice - Multiple tenants - Landlord"
    When I visit the Ukviet ending of tenancy page
    And I fill out my answers for the Ukviet questionnaire
    Then I check my answers for Ukviet - "Request a notice - Multiple tenants - Landlord"
    When I change the tenancy start date to "18/10/2022" and continue
    Then I check the tenancy start date is updated to "18/10/2022" on the Check your answers page
    And I am able to submit the Ukviet questionnaire

  @navigate-home
  Scenario Outline: UKVIET Navigate to home page <Description>
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the Ukviet ending of tenancy page
    And I fill out my answers for the Ukviet questionnaire
    Then I check my answers for Ukviet - "<Description>"
    And I am able to submit the Ukviet questionnaire
    And I am able to navigate back to home page
    Examples:
      | Scenario ID | Description                                                              |
      | 1           | Request a notice - Multiple tenants - Landlord                           |
      | 5           | Disqualified person left property - Multiple tenants - Checking Landlord |
      | 9           | Report disqualified person left property  - Multiple tenants - Agent     |
