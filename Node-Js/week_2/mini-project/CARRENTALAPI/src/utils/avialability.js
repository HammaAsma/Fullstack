export async function isAvialable(carId,from,to,rentals){
    return !rentals.some(r=>
        r.carId === carId &&
        r.status === "active" &&
        new Date(from) < new Date(r.to) &&
        new Date(r.from) < new Date(to)
    );
}