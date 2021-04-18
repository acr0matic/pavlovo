<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Проверяем отравленность сообщения
function SendMail($mail, &$status)
{
  if ($mail->send())
    $status = "Сообщение успешно отправлено";
  else
    $status =  "Сообщение не было отправлено. Причина ошибки: " . $mail->ErrorInfo;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


  // Настройки PHPMailer
  $mail = new PHPMailer\PHPMailer\PHPMailer();

  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  $mail->isHTML(true);
  $mail->Debugoutput = function ($str, $level) {
    $GLOBALS['status'][] = $str;
  };

  // Настройки вашей почты
  $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'pavlovopark@threaddigital.ru'; // Логин на почте
  $mail->Password   = 'e3k&i5KZXj*Dpx'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom('pavlovopark@threaddigital.ru', 'Павлово Парк'); // от кого будет уходить письмо?

  // Получатель письма
  $mail->addAddress('main.acr0matic@gmail.com');

  // Переменные
  $form = $_POST['form_type'];

  $name = $_POST['user_name'];
  $message = $_POST['user_message'];

  $age = $_POST['user_age'];
  if ("" == trim($age))
    $age = 'Не указан';

  $status = '';

  if ($form == 'survey') {
    // Формирование содержимого письма
    $title = "Оставлено мнение или предложение по парку";
    $body =
      "
      <html>
      <body>
      <p>
       Контактная информация: <br> <br>
       <b>Имя: </b> $name <br>
       <b>Возраст: </b> $age <br>
       <b>Сообщение: </b> $message <br>
      </p>
   ";

    $body .= "</body></html>";
  } else if ($form == 'callback') {
    // Формирование содержимого письма
    $title = "Был задан вопрос";
    $body =
      "
      <html>
      <body>
      <p>
       Контактная информация: <br> <br>
       <b>Имя: </b> $name <br>
       <b>Вопрос: </b> $message <br>
      </p>
   ";

    $body .= "</body></html>";
  }

  // Отправка сообщения
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail_info;

  SendMail($mail, $status);


  echo json_encode($status);
}
