(async function() {
  // Dữ liệu với thời gian trong ngày và giá trị trả về
  const data = [
    { time: '08:00', value: 30 },
    { time: '10:00', value: 32 },
    { time: '12:00', value: 33 },
    { time: '14:00', value: 32 },
    { time: '16:00', value: 31.5 },
    { time: '18:00', value: 31 },
    { time: '20:00', value: 30.8 },
  ];

  // Vẽ line chart
  new Chart(
    document.getElementById('gasSensor-chart'),
    {
      type: 'line', // Chuyển sang line chart
      data: {
        labels: data.map(row => row.time), // Trục hoành là thời gian
        datasets: [
          {
            label: 'Values over time', // Tên của dataset
            data: data.map(row => row.value), // Trục tung là giá trị
            fill: false, // Không tô màu dưới đường
            borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
            tension: 0.1, // Độ cong của đường (0 = đường thẳng)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of Day', // Nhãn cho trục x
            },
          },
          y: {
            title: {
              display: true,
              text: 'Returned Value', // Nhãn cho trục y
            },
          },
        },
      },
    }
  );
})();

(async function() {
  // Dữ liệu với thời gian trong ngày và giá trị trả về
  const data = [
    { time: '08:00', value: 200 },
    { time: '10:00', value: 250 },
    { time: '12:00', value: 300 },
    { time: '14:00', value: 400 },
    { time: '16:00', value: 360 },
    { time: '18:00', value: 350 },
    { time: '20:00', value: 300 },
  ];

  // Vẽ line chart
  new Chart(
    document.getElementById('photoresistor-chart'),
    {
      type: 'line', // Chuyển sang line chart
      data: {
        labels: data.map(row => row.time), // Trục hoành là thời gian
        datasets: [
          {
            label: 'Values over time', // Tên của dataset
            data: data.map(row => row.value), // Trục tung là giá trị
            fill: false, // Không tô màu dưới đường
            borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
            tension: 0.1, // Độ cong của đường (0 = đường thẳng)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of Day', // Nhãn cho trục x
            },
          },
          y: {
            title: {
              display: true,
              text: 'Returned Value', // Nhãn cho trục y
            },
          },
        },
      },
    }
  );
})();

(async function() {
  // Dữ liệu với thời gian trong ngày và giá trị trả về
  const data = [
    { time: '08:00', value: 10 },
    { time: '09:00', value: 10 },
    { time: '10:00', value: 10 },
    { time: '11:00', value: 10 },
    { time: '12:00', value: 13 },
    { time: '13:00', value: 15 },
    { time: '14:00', value: 17 },
    { time: '15:00', value: 14 },
    { time: '16:00', value: 10 },
    { time: '17:00', value: 10 },
    { time: '18:00', value: 10 },
  ];

  // Vẽ line chart
  new Chart(
    document.getElementById('vibration-chart'),
    {
      type: 'line', // Chuyển sang line chart
      data: {
        labels: data.map(row => row.time), // Trục hoành là thời gian
        datasets: [
          {
            label: 'Values over time', // Tên của dataset
            data: data.map(row => row.value), // Trục tung là giá trị
            fill: false, // Không tô màu dưới đường
            borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
            tension: 0.1, // Độ cong của đường (0 = đường thẳng)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of Day', // Nhãn cho trục x
            },
          },
          y: {
            title: {
              display: true,
              text: 'Returned Value', // Nhãn cho trục y
            },
          },
        },
      },
    }
  );
})();




