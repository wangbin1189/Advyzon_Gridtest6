class PeopleController < ApplicationController
  # GET /people
  # GET /people.json
  def index
    # @people = @people.order(params[:order_by])
    white_listed_current_page = params.permit(:page)[:page]
    white_listed_sort_by = params.permit(:sortBy)[:sortBy] || :name
    @people = Person
      .order(white_listed_sort_by)
      .page(white_listed_current_page || 1)
    render(
      json: { 
        results: @people,
        currentPage: @people.current_page,
        totalPages: @people.total_pages,
        sortBy: white_listed_sort_by
      }
    )
  end

  # GET /people/1
  # GET /people/1.json
  def show
    render json: {name: 'is me'}
  end

  # POST /people
  # POST /people.json
  def create
    # binding.pry
    person = Person.create(white_listed_params)
    if person.save
      render json: {success: true}
    else
      render json: {}, status: 400
    end
  end

  # PATCH/PUT /people/1
  # PATCH/PUT /people/1.json
  def update
    found_person = Person.find(white_listed_user_id)

    if !found_person
      render json: {}, status: 404
    end

    found_person.update_attributes(white_listed_params)
    
    if found_person.save
      render json: {success: true}
    else
      render json: {}, status: 400
    end
  end

  # DELETE /people/1
  # DELETE /people/1.json
  def destroy
    person = Person.find(white_listed_user_id)
    if person.destroy!                
      render json: { success: true}
    else
      render json: {}, status: 400
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.require(:person).permit(:name, :company, :title, :gender, :education)
    end
  
    # @param - { key: value }
    def white_listed_params
      params.permit(:education, :name, :gender, :title, :company) 
    end

    def white_listed_user_id
      params.permit(:id)[:id]
    end
end
