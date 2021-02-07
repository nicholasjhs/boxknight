## About The Project

This is my submission for the Full-Stack Developer Role @ BoxKnight, a Montreal-based software company that does same-day/next-day delivery.

### Built With

* [Node.js/Express](https://expressjs.com/)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You just need npm for this
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nicholasjhs/boxknight
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run NPM run start
   ```sh
   npm run start
   ```

<!-- USAGE EXAMPLES -->
## Usage

There are a total of 3 pages

1. Homepage (simply press start)

2. Shipment page. This is the actual application. Simply add an address and follow the instructions.

3. Thank you page that basically confirms the orders and "sends the shipment".

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- DESIGN CHOICES -->
## Design Choices

1. I had no experience with node/express except for a udemy tutorial I did, but I wanted to try it out since it was recommended and I'll be using it if I ever get the job.

2. I didn't 100% follow the instructions correctly because my API is heavily tied with my frontend, but I was already 3 days into the submission when I realized this so I just had to press forward with what I had.

3. In some areas, I had the scaling of the project in mind (like the way I organised the project or using Promise.allSettled in case there are more than 2 endpoints later on).

4. I chose to create a address storing to make it easier to send the shipment, but in reality, with a database, I think I would have simply stored the user's id and then went into the database to get the address (I'm talking about the addresses variable in /controller/shipment.js)

5. I'm 100% aware that the way I handled the address would have been so much easier if I had used something like react, vue or angular, but since I was learning express at the same time, I didn't want to put too much on my plate.

6. I built this project with a "make it work first and then make it better" mentality. Consequently, you might see some methods or a piece of code that are rough around the edges.

7. Finally, the hardest design choice was the balance between making a "perfect submission" vs "taking 1 month to submit".

8. For any other questions, feel free to ask me during the second round !