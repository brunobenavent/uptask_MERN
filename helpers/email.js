import nodemailer from 'nodemailer'


const emailOlvidePassword = async (email, token, nombre) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    // Información del email
    const info = await transport.sendMail({
        from: "UpTask - Administrador de Tareas y Proyectos",
        to: email,
        subject: "Reestablece tu password y empieza a administrar tus proyectos",
        text: "Reestablece tu password y empieza a administrar tus proyectos",
        html:
        `   
            <link href="https://unpkg.com/tailwindcss@0.7.4/dist/tailwind.min.css" rel="stylesheet" />
            <link href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" rel="stylesheet" />
            <div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
                <div class="mail__wrapper max-w-md mx-auto">
                    <div class="mail__content bg-white p-8 shadow-md">

                        <div class="content__header text-center tracking-wide border-b">
                            <div class="text-red text-6xl font-black">upTask</div>
                            <h1 class="text-xl h-48 flex items-center justify-center">Confirma tu Cuenta</h1>
                        </div>

                        <div class="content__body py-8 border-b">
                            <p>Hola ${nombre},<br/><br/>Obtén un nuevo password en el siguiente enlace</p>
                            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"><button  class="text-white text-sm tracking-wide bg-blue rounded font-bold w-full my-8 p-4 ">RESETEA TU PASSWORD</button ></a>
                            <p class="text-sm"> ¡Sigue Así!!<br/> EL Equipo de UpTask</p>
                        </div>

                        <div class="content__footer mt-8 text-center text-grey-darker">
                            <h3 class="text-base sm:text-lg mb-4">¡Gracias por usar nuestra app!</h3>
                            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
                        </div>

                    </div>

                    <div class="mail__meta text-center text-sm text-grey-darker mt-8">

                        <div class="meta__social flex justify-center my-4">
                            <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-twitter"></i></a>
                        </div>

                        <div class="meta__help">
                            <p class="leading-loose">¿Necesitas ayuda? <a href="#" class="text-grey-darkest">soporte@uptask.es</a><br/>¿No quieres recibir más emails? <a href="#" class="text-grey-darkest">Darse de Baja</a></p>
                        </div>

                    </div>

                </div>

            </div>

        ` // html body
      });
    
      console.log("Mensaje Enviado: %s", info.messageId);

     
}
const emailRegistro = async datos => {

    const {nombre, email, token} = datos
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    // Información del email
    const info = await transport.sendMail({
        from: "UpTask - Administrador de Tareas y Proyectos",
        to: email,
        subject: "Comprueba tu cuenta en UpTask",
        text: "Comprueba tu cuenta en UpTask",
        html:
        `   
            <link href="https://unpkg.com/tailwindcss@0.7.4/dist/tailwind.min.css" rel="stylesheet" />
            <link href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" rel="stylesheet" />
            <div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
                <div class="mail__wrapper max-w-md mx-auto">
                    <div class="mail__content bg-white p-8 shadow-md">

                        <div class="content__header text-center tracking-wide border-b">
                            <div class="text-red text-6xl font-bold">upTask</div>
                            <h1 class="text-3xl h-48 flex items-center justify-center">Confirmacion de E-mail</h1>
                        </div>

                        <div class="content__body py-8 border-b">
                            <p>Hola ${nombre},<br/><br/>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace</p>
                            <a href="${process.env.FRONTEND_URL}/confirmar/${token}"><button  class="text-white text-sm tracking-wide bg-blue rounded font-bold w-full my-8 p-4 ">CONFIRMAR CUENTA</button ></a>
                            <p class="text-sm"> ¡Sigue Así!!<br/> EL Equipo de UpTask</p>
                        </div>

                        <div class="content__footer mt-8 text-center text-grey-darker">
                            <h3 class="text-base sm:text-lg mb-4">¡Gracias por usar nuestra app!</h3>
                            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
                        </div>

                    </div>

                    <div class="mail__meta text-center text-sm text-grey-darker mt-8">

                        <div class="meta__social flex justify-center my-4">
                            <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-twitter"></i></a>
                        </div>

                        <div class="meta__help">
                            <p class="leading-loose">¿Necesitas ayuda? <a href="#" class="text-grey-darkest">soporte@uptask.es</a><br/>¿No quieres recibir más emails? <a href="#" class="text-grey-darkest">Darse de Baja</a></p>
                        </div>

                    </div>

                </div>

            </div>

        ` // html body
      });
    
      console.log("Mensaje Enviado: %s", info.messageId);

     
}

export {
  emailRegistro,
  emailOlvidePassword
} 