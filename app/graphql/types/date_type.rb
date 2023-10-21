# app/graphql/types/date_type.rb

class Types::DateType < GraphQL::Schema::Scalar
  description "An ISO8601 formatted date (YYYY-MM-DD)"

  # Coerce input value from the client
  def self.coerce_input(value, _context)
    begin
      Date.parse(value)
    rescue ArgumentError
      raise GraphQL::CoercionError, "Invalid date format. Expected 'YYYY-MM-DD'."
    end
  end

  # Coerce result value to send to the client
  def self.coerce_result(value, _context)
    value.to_s
  end
end
