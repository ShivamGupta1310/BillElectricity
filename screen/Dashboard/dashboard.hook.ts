import {useState} from 'react';

const useDashboardHook = () => {
  const [showTable, setShowTable] = useState(false);
  //   const [firstInclude, setFirstInclude] = useState(true);
  //   const [showFirst, setShowFirst] = useState(false);
  const [total, setTotal] = useState({
    bill: 0,
    unit: 0,
  });
  const [motor, setMotor] = useState({
    perviousUnit: 0,
    currentUnit: 0,
  });
  //   const [third, setThird] = useState({
  //     perviousUnit: 0,
  //     currentUnit: 0,
  //     otherAmount: 0,
  //     otherFlag: 0,
  //     unitUsed: 0,
  //     totalUnit: 0,
  //     totalAmount: 0,
  //     totalAmountDrink: 0,
  //   });
  //   const [second, setSecond] = useState({
  //     perviousUnit: 0,
  //     currentUnit: 0,
  //     otherAmount: 0,
  //     otherFlag: 1,
  //     unitUsed: 0,
  //     totalUnit: 0,
  //     totalAmount: 0,
  //     totalAmountDrink: 0,
  //   });
  const [per, setPer] = useState({
    unit: 0,
    motor: 0,
  });

  const handleTotalBill = (value: string) => {
    setTotal(settotal => ({
      ...settotal,
      bill: Number(value),
    }));
  };

  const handleTotalUnit = (value: string) => {
    setTotal(settotal => ({
      ...settotal,
      unit: Number(value),
    }));
  };
  return {
    showTable,
    setShowTable,
    total,
    setTotal,
    motor,
    setMotor,
    per,
    setPer,
    handleTotalBill,
    handleTotalUnit
  };
};
export default useDashboardHook;
