function transformStateForChart(state) {
  return {
    labels: state.map(weight => weight.label),
    data: state.map(weight => weight.weight)
  };
}

function yyymmdd() {
  const date = new Date();

  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('');
}

function createWeight(weight) {
  return {
    label: yyymmdd(),
    weight
  };
}

// Get or create state
let state = JSON.parse(localStorage.getItem('state'));

if (!state) {
  state = [];
}

// create data for chart
const transformedStateForChart = transformStateForChart(state);

const data = {
  labels: transformedStateForChart.labels,
  datasets: [
    {
      label: 'My weights in Kg',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: transformedStateForChart.data
    }
  ]
};

// create Chart
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: data,

  // Configuration options go here
  options: {}
});

// FORM
const input = document.querySelector('input');
const button = document.getElementsByTagName('button')[0];

button.addEventListener('click', () => {
  // update and save chart to local storage
  const weight = createWeight(+input.value);

  state.push(weight);
  localStorage.setItem('state', JSON.stringify(state));

  // empty the input
  input.value = '';

  // update chart
  chart.data.labels.push(weight.label);
  chart.data.datasets[0].data.push(weight.weight);
  chart.update();
});
