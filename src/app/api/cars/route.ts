let cars = [{
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Silver",
    price: 25000,
    fuel: "Gasoline",
    transmission: "Automatic",
    engine: "1.8L 4-cylinder",
    mileage: 15000,
    status: "Available",
}]

export async function GET() {
    return Response.json(cars)
}

export async function POST(req: Request) {
    const newCar = await req.json()
    newCar.id = Date.now()
    cars.push(newCar)
    return Response.json(newCar)
}

export async function PUT(req: Request) {
    const updated = await req.json()
    cars = cars.map((car) => (car.id === updated.id ? updated : car))
    return Response.json(updated)
}

export async function DELETE(req: Request) {
    const { id } = await req.json()
    cars = cars.filter((car) => car.id !== id)
    return Response.json({success: true})
}