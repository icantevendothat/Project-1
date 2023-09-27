        function createStar() {
            const star = document.createElement("div");
            star.className = "star";
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            return star;
        }

        function addStars() {
            const sky = document.body;
            for (let i = 0; i < 100; i++) {
                const star = createStar();
                sky.appendChild(star);
            }
        }
