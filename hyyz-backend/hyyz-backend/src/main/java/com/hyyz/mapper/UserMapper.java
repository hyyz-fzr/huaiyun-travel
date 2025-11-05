package com.hyyz.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hyyz.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}