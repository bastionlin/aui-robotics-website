import { assetUrl } from '../../lib/club';

export default function Logo({ inverse = false, className = '' }) {
  return <span className={`brand-lockup ${className}`}>
    <img src={assetUrl(`brand/aui-logo-${inverse ? 'white' : 'black'}.png`)} alt="AUI Robotics Club" width="1105" height={inverse ? '227' : '233'} />
  </span>;
}
