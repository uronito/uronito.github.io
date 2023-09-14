import { Container } from './styles'

import { decToHex } from 'utils/utils'

import { useMonitoring } from 'hooks/useMonitoring'
import { useKrakenStore } from 'store/kraken'

import { FiCpu as CpuIcon } from 'react-icons/fi'
import { BsGpuCard as GpuIcon } from 'react-icons/bs'
import { FaTemperatureLow as TempIcon } from 'react-icons/fa'
import { VscPulse as LoadIcon } from 'react-icons/vsc'

import { Progress } from 'components/Progress'

export const DualMonitor = () => {
  const krakenStore = useKrakenStore()

  const { cpu, gpu } = useMonitoring()

  const Cpu = () => (
    <div className="info-container">
      <div className="info-title">
        <CpuIcon color={krakenStore.cpuIcon.color} opacity={krakenStore.cpuIcon.alpha} />
        <span>{cpu?.name?.replace(/core/gi, '') ?? 'i9 11900K'}</span>
      </div>
      <div className="info-data">
        <div className="info-icon temperature">
          <TempIcon
            color={krakenStore.temperatureIcon.color}
            opacity={krakenStore.temperatureIcon.alpha}
          />
        </div>
        <div className="data">{cpu?.temperature ?? 42}°</div>
      </div>
      <div className="info-data">
        <div className="info-icon load">
          <LoadIcon
            color={krakenStore.loadIcon.color}
            opacity={krakenStore.loadIcon.alpha}
          />
        </div>
        <div className="data">
          {cpu?.load ?? 3}
          <span>%</span>
        </div>
      </div>
    </div>
  )

  const Gpu = () => (
    <div className="info-container">
      <div className="info-title">
        <GpuIcon color={krakenStore.gpuIcon.color} opacity={krakenStore.gpuIcon.alpha} />
        <span>{gpu?.name?.replace(/nvidia geforce/gi, '') ?? 'RTX 3080 Ti'}</span>
      </div>
      <div className="info-data">
        <div className="info-icon temperature">
          <TempIcon
            color={krakenStore.temperatureIcon.color}
            opacity={krakenStore.temperatureIcon.alpha}
          />
        </div>
        <div className="data">{gpu?.temperature ?? 45}°</div>
      </div>
      <div className="info-data">
        <div className="info-icon load">
          <LoadIcon
            color={krakenStore.loadIcon.color}
            opacity={krakenStore.loadIcon.alpha}
          />
        </div>
        <div className="data">
          {gpu?.load ?? 12}
          <span>%</span>
        </div>
      </div>
    </div>
  )

  return (
    <Container
      style={{
        backgroundColor:
          krakenStore.background.color + decToHex(krakenStore.background.alpha * 100),
      }}
    >
      <Progress
        leftValue={cpu?.temperature}
        rightValue={gpu?.temperature}
        leftCircleStart={krakenStore.leftCircleStart}
        leftCircleEnd={krakenStore.leftCircleEnd}
        rightCircleStart={krakenStore.rightCircleStart}
        rightCircleEnd={krakenStore.rightCircleEnd}
        background={krakenStore.circleBackground}
      >
        <div
          className="monitoring"
          style={{
            color: krakenStore.text.color + decToHex(krakenStore.text.alpha * 100),
          }}
        >
          <Cpu />
          <div
            className="info-separator"
            style={{
              borderColor: krakenStore.separator.color,
              opacity: krakenStore.separator.alpha,
            }}
          ></div>
          <Gpu />
        </div>
      </Progress>
    </Container>
  )
}
