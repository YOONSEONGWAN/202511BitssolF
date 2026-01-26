import WeatherCondition, { type WeatherCondition as WeatherConditionType } from './WeatherCondition'
interface TodayWeatherCardSectionProps {
  condition: WeatherConditionType
  temperature: number
}

function TodayWeatherCardSection({
  condition,
  temperature,
}: TodayWeatherCardSectionProps) {
  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex flex-column align-items-center gap-3">
        <WeatherCondition condition={condition} temperature={temperature} />
      </div>
    </div>
  )
}

export default TodayWeatherCardSection
