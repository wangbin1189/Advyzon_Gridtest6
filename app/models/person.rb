class Person < ApplicationRecord
    paginates_per 10
end

# Person -> people -> people table