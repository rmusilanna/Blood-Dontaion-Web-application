module.exports = ({ name, email, phone }) => {
  return `
        <html>

            <body>

                <div style="text-align: center">
                    <h3>Someone is in need of your blood!</h3>
                    <p>Contact</p>
                    <div>
                        <strong>Name</strong>: ${name}
                    </div>
                    <div>
                        <strong>Email</strong>: ${email}
                    </div>
                    <div>
                        <strong>Phone</strong>: ${phone}
                    </div>
                    
                    <div>
                        Click <a href="https://bdonationapp.herokuapp.com">here</a> to donate.
                    </div>
                
                </div>

            </body>

        </html>
    
    `;
};
