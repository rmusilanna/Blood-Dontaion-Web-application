module.exports = ({ name, email, phone }) => {
  return `
        <html>

            <body>

                <div style="text-align: center">
                    <h3>A donor ready to donate!</h3>
                    <div>
                        <strong>Name</strong>: ${name}
                    </div>
                    <div>
                        <strong>Email</strong>: ${email}
                    </div>
                    <div>
                        <p>Please contact: ${phone}</p>
                    </div>
                    
                </div>

            </body>

        </html>
    
    `;
};
