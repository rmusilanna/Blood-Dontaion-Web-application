module.exports = () => {
  return `
          <html>

              <head>

                    <style>

                        a.btn{
                            padding: 1rem;
                            margin: 1rem;
                            color: #fff;
                            text-decoration: none;
                        }

                        .red{
                            background: rgba(255, 6, 6, 0.63);
                            color: #fff;
                        }

                        .black{
                            background: #000;
                            color: #fff;
                        }
                    
                    </style>
              
              </head>
  
              <body>
  
                  <div style="text-align: center">
                      <h3>Monthly Blood Availability Reminder!</h3>
                      <p>It's the beginning of a new month.</p>
                      <p>Please search for donors <a href="https://bdonationapp.herokuapp.com">here</a> before it's too late.</p>

                      <div style='margin: 1rem'>
                      <a class='btn red' href="https://bdonationapp.herokuapp.com/search">Search Donors</a>       
                      <a class='btn black' href="https://bdonationapp.herokuapp.com/request">Request Blood</a>     
                      </div>  
                      
                  </div>
  
              </body>
  
          </html>
      
      `;
};
