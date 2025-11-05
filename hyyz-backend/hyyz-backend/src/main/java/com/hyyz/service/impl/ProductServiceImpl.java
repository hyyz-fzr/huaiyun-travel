package com.hyyz.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hyyz.entity.Product;
import com.hyyz.mapper.ProductMapper;
import com.hyyz.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
}