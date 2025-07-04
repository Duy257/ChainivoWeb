"use client";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/store/reducers/CounterSlice";
import { RootState } from "@/store/store";
import { Button, Typography } from "antd";

const { Text } = Typography;

export default function Counter() {
  const dispatch = useDispatch();
  const { value } = useSelector((state: RootState) => state.counter);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Counter Page</h1>
      <div className="flex items-center space-x-4">
        <Button type="primary" onClick={() => dispatch(decrement(1))}>
          Decrement
        </Button>
        <Text className="text-3xl font-semibold">{value}</Text>
        <Button type="primary" onClick={() => dispatch(increment(1))}>
          Increment
        </Button>
      </div>
    </div>
  );
}
