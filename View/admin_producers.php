<?php
include 'View/header.php';
?>

<div class="container flex-row">
    <?php
    include 'View/admin_menu.php';
    ?>
    <div class="width100">
        <form class="create-collection flex-row align-center">
            <div class="form-item">
                <div class="form-item_lable">Назва нового бренду</div>
                <input type="text" required minlength=4 name="producer" />
            </div>

            <button type="submit">
                Add brand
            </button>
        </form>

        <div class="collections-list">
            <?php
            echo "<table>";
            echo "<tr>";
            echo "<th>Name</th>";
            echo "<th>Action</th>";
            echo "<th>Action</th>";
            echo "</tr>";

            // Цикл по результатам выборки
            foreach ($this->producers as $producer) {
                echo "<tr>";
                echo "<td>" . $producer["name"] . "</td>";
                echo "<td><div> Edit </div></td>";
                echo "<td><div> Delete </div></td>";
                echo "</tr>";
            }

            echo "</table>";
            ?>
        </div>
    </div>
</div>

<script>
    const form = document.querySelector('.create-collection')
    form.addEventListener('submit', () => submitHandler())

    function submitHandler() {
        const formData = new FormData(form)
        const url = '/admin_producers';

        fetch(url, {
            method: "POST",
            body: formData
        }).then(() => {
            window.location.reload()
        })
    }
</script>