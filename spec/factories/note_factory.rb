FactoryBot.define do
  factory :note do
    sequence(:name) { |n| "Note (#{n})" }
    sequence(:content) { |n| "Describe Note (#{n})" }
  end
end
