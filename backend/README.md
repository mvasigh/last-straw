# Setup
In order to set up the backend, follow these steps:
```npm install```
```node server.js```

# End points
Simple end point available
/places/:id

Try IDs 1-100 and test an end point by navigating here in your browser:
http://localhost:3000/places/1

You should see the following response:
```
{
id: 1,
name: "Merida Mexican Restaurant",
address: "2509 Navigation Blvd, Houston, TX 77003",
lat: 29.7582547,
long: 95.34373,
styrofoam: true,
plastic: false,
icondiments: true,
compostable: false,
createdAt: "2019-05-19T03:47:39.222Z",
updatedAt: "2019-05-19T03:47:39.222Z"
}
```