class CreateResultsForecasts < ActiveRecord::Migration[4.2]
  def change
    create_table :results_forecasts do |t|
      t.string :code, limit: 6
      t.integer :year, limit: 2
      t.integer :month, limit: 1
      t.integer :quarter, limit: 1
      t.boolean :is_consolidated, default: true
      t.integer :forecast_net_sales
      t.integer :forecast_operating_income
      t.integer :forecast_ordinary_income
      t.integer :forecast_net_income
      t.float :forecast_net_income_per_share
      t.integer :previous_forecast_net_sales
      t.integer :previous_forecast_operating_income
      t.integer :previous_forecast_ordinary_income
      t.integer :previous_forecast_net_income
      t.float :previous_forecast_net_income_per_share
      t.float :change_in_forecast_net_sales
      t.float :change_in_forecast_operating_income
      t.float :change_in_forecast_ordinary_income
      t.float :change_in_forecast_net_income
      t.float :change_forecast_net_sales
      t.float :change_forecast_operating_income
      t.float :change_forecast_ordinary_income
      t.float :change_forecast_net_income
      t.integer :disclosure_id

      t.timestamps

      t.index [:disclosure_id, :quarter], name: "index_unique_results_forecasts_disclosure_id_quarter", unique: true
      t.index [:quarter, :code], name: "index_results_forecasts_quarter_code"
    end
  end
end
