import React from 'react';

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <div className="flex flex-wrap gap-6 justify-center p-6">
  <div className="bg-white shadow-md rounded-xl w-80 overflow-hidden">
    <img
      src="https://picsum.photos/400/300?random=1"
      alt="Card 1"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Card 1</h3>
      <p className="text-gray-600">This is a description for card 1.</p>
    </div>
  </div>

  <div className="bg-white shadow-md rounded-xl w-80 overflow-hidden">
    <img
      src="https://picsum.photos/400/300?random=2"
      alt="Card 2"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Card 2</h3>
      <p className="text-gray-600">This is a description for card 2.</p>
    </div>
  </div>

  <div className="bg-white shadow-md rounded-xl w-80 overflow-hidden">
    <img
      src="https://picsum.photos/400/300?random=3"
      alt="Card 3"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Card 3</h3>
      <p className="text-gray-600">This is a description for card 3.</p>
    </div>
  </div>

  <div className="bg-white shadow-md rounded-xl w-80 overflow-hidden">
    <img
      src="https://picsum.photos/400/300?random=4"
      alt="Card 4"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Card 4</h3>
      <p className="text-gray-600">This is a description for card 4.</p>
    </div>
  </div>

  <div className="bg-white shadow-md rounded-xl w-80 overflow-hidden">
    <img
      src="https://picsum.photos/400/300?random=5"
      alt="Card 5"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Card 5</h3>
      <p className="text-gray-600">This is a description for card 5.</p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Home;