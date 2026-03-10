        // Variabel Global untuk Setiap Program
        let daftarTugas = [];
        let dataStok = [];
        let riwayatSetoran = [];
        
        // Fungsi Navigasi Halaman
        function tampilkanHalaman(id) {
            const halaman = document.querySelectorAll('.halaman');
            halaman.forEach(hal => hal.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        }
        // ================== PROGRAM DAFTAR TUGAS ==================
        
        function tambahTugas() {
            const input = document.getElementById('inputTugas').value.trim();
            if (input) {
                daftarTugas.push(input);
                updateDaftarTugas();
                document.getElementById('inputTugas').value = '';
            }
        }

        function hapusTugasTerakhir() {
            if (daftarTugas.length > 0) {
                daftarTugas.pop();
                updateDaftarTugas();
            }
        }

        function resetTugas() {
            daftarTugas = [];
            updateDaftarTugas();
        }

        function updateDaftarTugas() {
            const list = document.getElementById('daftarTugas');
            list.innerHTML = '';
            daftarTugas.forEach(tugas => {
                const li = document.createElement('li');
                li.textContent = tugas;
                list.appendChild(li);
            });
            // Update total tugas
            document.getElementById('totalTugas').textContent = daftarTugas.length;
        }
        // ================== PROGRAM STOK GUDANG ==================
        function tambahStok() {
            const nama = document.getElementById('namaBarang').value.trim();
            const jumlah = parseInt(document.getElementById('jumlahStok').value);
            if (nama && !isNaN(jumlah) && jumlah > 0) {
                dataStok.push({ nama: nama, stok: jumlah });
                updateTabelStok();
                document.getElementById('namaBarang').value = '';
                document.getElementById('jumlahStok').value = '';
            }
        }
        
        function hapusStokTerakhir() {
            if (dataStok.length > 0) {
                dataStok.pop();
                updateTabelStok();
            }
        }
        
        function resetStok() {
            dataStok = [];
            updateTabelStok();
        }
        
        function updateTabelStok() {
            const tbody = document.querySelector('#tabelStok tbody');
            tbody.innerHTML = '';
            let total = 0;
            dataStok.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${item.nama}</td><td>${item.stok}</td>`;
                tbody.appendChild(tr);
                total += item.stok;
            });
            document.getElementById('totalStok').textContent = total;
        }
        // ================== PROGRAM BUKU TABUNGAN ==================
        function tambahSetoran() {
            const jumlah = parseInt(document.getElementById('jumlahSetoran').value);
            if (!isNaN(jumlah) && jumlah >= 1000) {
                riwayatSetoran.push(jumlah);
                updateRiwayatSetoran();
                document.getElementById('jumlahSetoran').value = '';
                document.getElementById('detailSaldo').style.display = 'none';
            }
        }
        
        function hapusSetoranTerakhir() {
            if (riwayatSetoran.length > 0) {
                riwayatSetoran.pop();
                updateRiwayatSetoran();
                document.getElementById('detailSaldo').style.display = 'none';
            }
        }
        
        function resetTabungan() {
            riwayatSetoran = [];
            updateRiwayatSetoran();
            document.getElementById('detailSaldo').style.display = 'none';
        }
        
        function updateRiwayatSetoran() {
            const list = document.getElementById('riwayatSetoran');
            list.innerHTML = '';
            riwayatSetoran.forEach((setoran, index) => {
                const li = document.createElement('li');
                li.textContent = `Setoran ${index + 1}: Rp ${setoran.toLocaleString('id-ID')}`;
                list.appendChild(li);
            });
        }
        
        function cetakSaldo() {
            if (riwayatSetoran.length === 0) return;
            
            const totalSebelum = riwayatSetoran.reduce((acc, curr) => acc + curr, 0);
            const bonus = totalSebelum >= 1000000 ? totalSebelum * 0.07 : 0;
            const saldoAkhir = totalSebelum + bonus;
            
            document.getElementById('totalSebelumBonus').textContent = `Rp ${totalSebelum.toLocaleString('id-ID')}`;
            document.getElementById('bonusTabungan').textContent = `Rp ${bonus.toLocaleString('id-ID')}`;
            document.getElementById('saldoAkhir').textContent = `Rp ${saldoAkhir.toLocaleString('id-ID')}`;
            document.getElementById('detailSaldo').style.display = 'block';
        }