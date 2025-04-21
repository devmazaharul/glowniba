'use clinet'
import { ScaleLoader } from 'react-spinners';
const Spiner = ({color='#fff'}:{color?:string}) => {
  
  return (
    <div>
    <ScaleLoader
  color={color}
  height={14}
  margin={2}
  radius={5}
  width={2}
/>
    </div>
  );
}

export default Spiner;
