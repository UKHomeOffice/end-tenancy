@feature @report @agent
Feature: Report that a disqualified person has left your property
  A landlord user should be able to complete the form

  Scenario: Complete 'report' application - single tenant, agent
    Given I start a 'report'
    Then I fill the 'nldp-date' date
    Then I fill the address fields with correct information
    Then I fill 'name' with 'name'
    Then I submit the page
    Then I fill the 'date-left' date
    Then I do not add another tenant
    Then I set the user as 'agent'
    Then I fill the 'agent' address fields with correct information
    Then I fill 'landlord-name-agent' with 'name'
    Then I submit the page
    Then I use the same address as previously provided
    Then I should be on the 'confirm-declaration' page
    Then I confirm the declaration
    Then I submit the application
    Then I should be on the 'confirmation' page

  Scenario: Complete 'report' application - multiple tenants, agent
    Given I start a 'report'
    Then I fill the 'nldp-date' date
    Then I fill the address fields with correct information
    Then I fill 'name' with 'name'
    Then I submit the page
    Then I fill the 'date-left' date
    Then I add another tenant
    Then I fill 'name' with 'name 2'
    Then I submit the page
    Then I fill the 'date-left' date
    Then I do not add another tenant
    Then I set the user as 'agent'
    Then I fill the 'agent' address fields with correct information
    Then I fill 'landlord-name-agent' with 'name'
    Then I submit the page
    Then I use the same address as previously provided
    Then I should be on the 'confirm-declaration' page
    Then I confirm the declaration
    Then I submit the application
    Then I should be on the 'confirmation' page
