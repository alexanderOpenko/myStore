<?php 
if (isset($_SESSION['login'])) {
    header('Location: admin');
    exit;
}
include 'View/header.php' 
?>

<div class="container">
    <?php 
        if (isset($_SESSION['warning'])) {
            echo $_SESSION['warning'];
        }

        unset($_SESSION['warning'])
    ?>
    <form class="admin-form">
        <div class="form-item">
            <div class="form-item_lable body1 bold-label">ПАРОЛЬ</div>
            <input class="form-input" required type="password" name="password"/>
        </div>

        <button class="blue">
            Увійти
        </button>
    </form>
</div>

<script>
    const btn = document.querySelector('.blue')
    btn.addEventListener('click',() => loginSubmitHundler())

    const loginSubmitHundler = async (e) => {
        const val = document.querySelector('.form-input').value

        const resp = await fetch(`/admin_login_checkout?pass=${val}`)
    }
</script>

<?php include 'View/footer.php' ?>