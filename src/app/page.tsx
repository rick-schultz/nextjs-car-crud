"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  fuel: string;
  transmission: string;
  engine: string;
  mileage: number;
  status: string;
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    year: 0,
    color: "",
    price: 0,
    fuel: "",
    transmission: "",
    engine: "",
    mileage: 0,
    status: "",
  });

  useEffect(() => {
    axios.get("/api/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  const addCar = async () => {
    const res = await axios.post("/api/cars", newCar);
    setCars([...cars, res.data]);
    setNewCar({
      brand: "",
      model: "",
      year: 0,
      color: "",
      price: 0,
      fuel: "",
      transmission: "",
      engine: "",
      mileage: 0,
      status: "",
    });
  };

  const deleteCar = async (id: number) => {
    await axios.delete("/api/cars", { data: { id } });
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      
      <h1 className="text-2xl">Add New Cars</h1>

      <div className="grid grid-cols-5 gap-4">
        <div>
          <label
            htmlFor="newCarBrand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand
          </label>
          <input
            id="newCarBrand"
            value={newCar.brand}
            onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            className="border p-2 mr-2"
          />
        </div>
        <div>
          <label
            htmlFor="newCarModel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Model
          </label>
          <input
            id="newCarModel"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            className="border p-2 mr-2"
          />
        </div>
        <div>
          <label
            htmlFor="newCarPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <input
            id="newCarPrice"
            type="number"
            value={newCar.price}
            onChange={(e) =>
              setNewCar({ ...newCar, price: Number(e.target.value) })
            }
            className="border p-2 mr-2"
          />
        </div>

        <div>
          <label
            htmlFor="newCarTransmission"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transmission
          </label>
          <select
            id="newCarTransmission"
            value={newCar.transmission}
            onChange={(e) =>
              setNewCar({ ...newCar, transmission: e.target.value })
            }
            className="border p-2 mr-2"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="newCarYear"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Year
          </label>
          <select
            id="newCarYear"
            value={newCar.year}
            onChange={(e) =>
              setNewCar({ ...newCar, year: Number(e.target.value) })
            }
            className="border p-2 mr-2"
          >
            {Array.from({ length: 50 }, (_, i) => 2024 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="newCarEngine"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Engine
          </label>
          <input
            id="newCarEngine"
            value={newCar.engine}
            onChange={(e) => setNewCar({ ...newCar, engine: e.target.value })}
            className="border p-2 mr-2"
          />
        </div>

        <div>
          <label
            htmlFor="newCarMileage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mileage
          </label>
          <input
            id="newCarMileage"
            value={newCar.mileage}
            onChange={(e) =>
              setNewCar({ ...newCar, mileage: Number(e.target.value) })
            }
            className="border p-2 mr-2"
          />
        </div>
        <div>
          <label
            htmlFor="newCarColor"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Color
          </label>
          <input
            id="newCarColor"
            value={newCar.color}
            onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
            className="border p-2 mr-2"
          />
        </div>
        <div>
          <label
            htmlFor="newCarFuel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fuel
          </label>
          <select
            id="newCarFuel"
            value={newCar.fuel}
            onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="newCarStatus"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="newCarStatus"
            value={newCar.status}
            onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
            className="border p-2"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      <button
        onClick={addCar}
        className="bg-blue-500 text-white p-2 rounded max-w-2xs"
      >
        Add Car
      </button>

      <h1 className="text-2xl">Car List</h1>

      <ul className="flex gap-4">
        {cars.map((car) => (
          <li
            key={car.id}
            className="flex flex-col gap-4 border border-gray-200 rounded-xl p-4 max-w-fit"
          >
            <p>
              Car: {car.brand} - {car.model} ({car.year}) - {car.color}
            </p>
            <p>Price: ${car.price}</p>
            <p>Type of fuel: {car.fuel}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Engine: {car.engine}</p>
            <p>Car Mileage: {car.mileage}</p>
            <p>{car.status}</p>
            <button
              onClick={() => deleteCar(car.id)}
              className="bg-white rounded-sm p-2 text-red-500 cursor-pointer hover:text-red-800 max-w-2xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
