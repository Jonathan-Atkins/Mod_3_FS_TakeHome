require 'rails_helper'

RSpec.describe 'Tea Subscriptions API', type: :request do
  before(:each) do
    @customer1 = Customer.create!(first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', address: '123 Elm St')
    @customer2 = Customer.create!(first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', address: '456 Oak St')

    @tea1 = Tea.create!(title: 'Green Tea', description: 'A refreshing green tea', temperature: 80.0, brew_time: '2 minutes', price: 5.99)
    @tea2 = Tea.create!(title: 'Black Tea', description: 'A strong black tea', temperature: 90.0, brew_time: '4 minutes', price: 6.99)
    @tea3 = Tea.create!(title: 'Chamomile Tea', description: 'A calming chamomile tea', temperature: 70.0, brew_time: '5 minutes', price: 7.99)

    @subscription1 = Subscription.create!(title: 'Monthly Green Tea Box', price: 15.99, canceled: false, frequency: 1.year)
    @subscription2 = Subscription.create!(title: 'Quarterly Black Tea Box', price: 25.99, canceled: false, frequency: 2.months)

    CustomerSubscription.create!(subscription_id: @subscription1.id, customer_id: @customer1.id)
    CustomerSubscription.create!(subscription_id: @subscription1.id, customer_id: @customer2.id)
    TeaSubscription.create!(subscription_id: @subscription1.id, tea_id: @tea1.id)

    TeaSubscription.create!(subscription_id: @subscription2.id, tea_id: @tea2.id)
    TeaSubscription.create!(subscription_id: @subscription2.id, tea_id: @tea3.id)
  end

  describe 'GET /subscriptions' do
    it 'can get all subscriptions' do
      get "/api/v1/subscriptions/"

      expect(response).to be_successful
      expect(response.status).to eq(200)

      subscriptions = JSON.parse(response.body, symbolize_names: true)
      expect(subscriptions[:data].count).to eq(2)
    end
  end

  describe 'GET /subscriptions/:id' do
    it 'can get a specific subscription' do
      get "/api/v1/subscriptions/#{@subscription1.id}"

      expect(response).to be_successful
      expect(response.status).to eq(200)

      subscription = JSON.parse(response.body, symbolize_names: true)
      expect(subscription[:data][:attributes]).to include(:title, :price, :canceled, :frequency)
    end

    it 'returns 404 if subscription does not exist' do
      get "/api/v1/subscriptions/9999"

      expect(response).to have_http_status(404)

      error = JSON.parse(response.body, symbolize_names: true)
      expect(error[:error].first[:status]).to eq(404)
      expect(error[:error].first[:title]).to eq("Couldn't find Subscription with 'id'=9999")
    end
  end

  describe 'canceled subscriptions' do
    it 'can handle canceled subscriptions' do
      @subscription1.update(canceled: true)

      get "/api/v1/subscriptions/#{@subscription1.id}"

      expect(response).to be_successful
      expect(response.status).to eq(200)

      subscription = JSON.parse(response.body, symbolize_names: true)
      expect(subscription[:data][:attributes][:canceled]).to eq(true)
    end

    it 'returns empty array when no subscriptions exist' do
      TeaSubscription.delete_all
      CustomerSubscription.delete_all
      Subscription.delete_all

      get "/api/v1/subscriptions/"

      expect(response).to be_successful
      expect(response.status).to eq(200)

      subscriptions = JSON.parse(response.body, symbolize_names: true)
      expect(subscriptions[:data].count).to eq(0)
    end
  end

  describe 'PATCH subscriptions/:id' do
    it 'can cancel a specific subscription' do
      patch "/api/v1/subscriptions/#{@subscription1.id}"

      expect(response).to be_successful
      expect(response.status).to eq(200)

      @subscription1.reload
      expect(@subscription1.canceled).to eq(true)
    end

    it 'returns 404 if subscription does not exist' do
      patch "/api/v1/subscriptions/9999"

      expect(response).to have_http_status(404)

      error = JSON.parse(response.body, symbolize_names: true)
      expect(error[:error].first[:status]).to eq(404)
      expect(error[:error].first[:title]).to eq("Couldn't find Subscription with 'id'=9999")
    end
  end
end