package com.example.library.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library.models.PurchaseProduct;


@Repository
public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct,Long> {
	
}