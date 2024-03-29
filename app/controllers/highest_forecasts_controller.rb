class HighestForecastsController < ApplicationController

  def index
    @highest_forecasts = HighestForecast
                         .joins(:summary)
                         .includes(:summary,
                                   results_forecast: { disclosure: { stock: :stock_price_latest } })
                         .order("highest_forecasts.date desc, highest_forecasts.id desc")
                         .page(params[:page])

    # 同じ決算期の場合、最初に作成されたも時に表示
    # @highest_forecasts = filter_duplications(highest_forecasts)
  end

  private

  def filter_duplications(highest_forecasts)
    prev_highest_forecasts = {}
    first_highest_forecast_index = []

    highest_forecasts.reverse.each_with_index do |highest_forecast, i|
      key = highest_forecast.to_key

      unless prev_highest_forecasts[key]
        prev_highest_forecasts[key] = highest_forecast
        first_highest_forecast_index << i
      end
    end

    highest_forecasts
      .reverse
      .select
      .with_index { |_, i| first_highest_forecast_index.include?(i) }
      .reverse
  end
end
