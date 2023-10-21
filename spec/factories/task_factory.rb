FactoryBot.define do
  factory :task do
    sequence(:name) { |n| "John (#{n})" }
    sequence(:description) { |n| "Smith (#{n})" }
    sequence(:due_date) { 40.years.ago }
  end
end