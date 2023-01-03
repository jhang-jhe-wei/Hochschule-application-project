class CourseRegisterRecord < ApplicationRecord
  belongs_to :registerable, polymorphic: true
  belongs_to :user
end